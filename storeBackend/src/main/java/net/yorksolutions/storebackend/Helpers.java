package net.yorksolutions.messageboardbackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

public class Helpers {

    public static <T> T emptyCheck(Optional<T> item) {
        if (item.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT);
        }
        return item.get();
    }
    public static void presenceCheck(Optional item) {
        if (item.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}