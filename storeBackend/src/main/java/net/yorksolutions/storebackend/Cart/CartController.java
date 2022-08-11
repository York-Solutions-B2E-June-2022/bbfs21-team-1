package net.yorksolutions.storebackend.Cart;

import net.yorksolutions.storebackend.CartItem.CartItem;
import net.yorksolutions.storebackend.CartItem.CartItemRequest;
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
    public Iterable<CartItem> getAllCartItems(@PathVariable Long userId){
        return this.service.GET_USER_CART_ITEMS(userId);
    }
    @PostMapping("/add")
    public void addToCart(@RequestBody CartItemRequest request){
       this.service.ADD_TO_CART(request);
    }

    @PostMapping
    public void createCart(@RequestBody CartRequest request){
        this.service.CREATE_CART(request.userId);
    }
}
