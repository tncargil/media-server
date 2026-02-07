package com.media.server;
import java.io.File;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class MediaController {

    @Value("${spring.folder}")
    String folderPath;

    @GetMapping("/")
    public String index() {
        return "index.html";
    }
    @GetMapping(value = "/video", produces = "video/mp4")
    public Resource streamVideo() {
        File videoFile = new File("");
        return new FileSystemResource(videoFile);
    }
    @GetMapping(value = "/list")
    public ResponseEntity<List<String>> getFiles() {
        System.out.println("asdf: "+folderPath);
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
    
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) throws IOException {
        Path path = Paths.get(folderPath).resolve(fileName);
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
