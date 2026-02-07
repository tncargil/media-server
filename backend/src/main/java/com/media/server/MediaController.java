package com.media.server;
import java.io.File;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

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
    public void getFiles() {
        System.out.println("asdf: "+folderPath);
        File folder = new File(folderPath);
        File[] listOfFiles = folder.listFiles();
        if (listOfFiles != null) {
            for (int i = 0; i < listOfFiles.length; i++) {
                if (listOfFiles[i].isFile()) {
                    System.out.println("File " + listOfFiles[i].getName());
                } else if (listOfFiles[i].isDirectory()) {
                    System.out.println(listOfFiles[i].getName());
                }
            }
        } else {
            System.out.println("No Files or folder path is incorrect");
        }
    }
}
