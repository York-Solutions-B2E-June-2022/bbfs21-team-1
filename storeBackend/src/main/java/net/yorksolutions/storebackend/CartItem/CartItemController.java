package net.yorksolutions.storebackend.CartItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(("/items"))
public class CartItemController {

    CartItemService service;
    @Autowired
    public CartItemController(CartItemService service){
        this.service = service;
    }

    @PostMapping
    public void createItem(@RequestBody CartItemRequest requestBody){this.service.ADD_ITEM(requestBody);}
    @PostMapping("/edit")
    public void setQty(@RequestBody CartItemRequest request){
        this.service.SET_QTY(request.quantity, request.id);
    }
    @PostMapping("/checkout")
    public void setPurchased(@RequestBody CartItemRequest request){
        this.service.SET_PURCHASED(request.id);
    }
    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Long id){
        this.service.REMOVE_ITEM(id);
    }
}
