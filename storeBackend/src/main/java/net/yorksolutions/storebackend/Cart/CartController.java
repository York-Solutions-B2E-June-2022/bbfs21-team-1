package net.yorksolutions.storebackend.Cart;

import net.yorksolutions.storebackend.CartItem.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/carts")
public class CartController {

    CartService service;
    @Autowired
    public CartController(CartService cartService){
        this.service = cartService;
    }

    @GetMapping("/{userId}")
    public Iterable<CartItem> getUserCart(@PathVariable Long userId){
        return this.service.GET_USER_CART(userId);
    }

    @PostMapping
    public void createCart(@RequestBody CartRequest request){
        this.service.CREATE_CART(request.userId);
    }
}
