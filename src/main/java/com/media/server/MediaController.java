package com.media.server;
import java.io.File;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
public class MediaController {
    @GetMapping("/")
    public String index() {
        return "index.html";
    }
    @GetMapping(value = "/video", produces = "video/mp4")
    public Resource streamVideo() {
        File videoFile = new File("");
        return new FileSystemResource(videoFile);
    }
}
