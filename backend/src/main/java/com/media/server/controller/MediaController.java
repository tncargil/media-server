package com.media.server.controller;
import java.io.File;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.core.io.UrlResource;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
public class MediaController {

    @Value("${spring.folder}")
    String folderPath;

    @GetMapping(value = "/video")
    public ResponseEntity<Resource> streamVideo(@RequestParam String fileName) {
        Path path = Paths.get(folderPath).resolve(fileName);
        File videoFile = path.toFile();

        if(!videoFile.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(videoFile);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("video/mp4"))
                .body(resource);
    }

    @GetMapping(value = "/list")
    public ResponseEntity<List<String>> getFiles() {
        System.out.println("       host: "+folderPath);
        File folder = new File(folderPath);
        File[] listOfFiles = folder.listFiles();
        List<String> fileNames = new ArrayList<>();
        if (listOfFiles != null) {
            for (int i = 0; i < listOfFiles.length; i++) {
                if (listOfFiles[i].isFile()) {
                    System.out.println("File " + listOfFiles[i].getName());
                    fileNames.add(listOfFiles[i].getName());
                } else if (listOfFiles[i].isDirectory()) {
                    System.out.println(listOfFiles[i].getName());
                }
            }
            return ResponseEntity.ok(fileNames);
        } else {
            System.out.println("No Files or folder path is incorrect");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam String fileName) throws IOException {
        Path path = Paths.get(folderPath).resolve(fileName);
        Resource resource = new UrlResource(path.toUri());

        String contentType = Files.probeContentType(path);
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if(file.isEmpty()) {
            System.out.println("file empty");
            return ResponseEntity.badRequest().body("Please select a file");
        }

        try {
            Path copyLocation = Paths.get(folderPath).resolve(file.getOriginalFilename());
            Files.createDirectories(copyLocation.getParent());

            Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("successful upload" + copyLocation.toString());
            return ResponseEntity.ok("File upload successful");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("error uploading: " + e.getMessage());
        }
    }
}
