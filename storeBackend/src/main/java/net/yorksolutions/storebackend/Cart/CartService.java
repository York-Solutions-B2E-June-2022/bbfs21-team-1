package net.yorksolutions.storebackend.Cart;

import net.yorksolutions.storebackend.Accounts.Account;
import net.yorksolutions.storebackend.Accounts.AccountRepository;
import net.yorksolutions.storebackend.CartItem.CartItem;
import net.yorksolutions.storebackend.CartItem.CartItemService;
import net.yorksolutions.storebackend.Products.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import static net.yorksolutions.storebackend.Helpers.emptyCheck;

@Service
public class CartService {
    CartRepository repository;
    AccountRepository accountRepository;
    CartItemService cartItemService;
    @Autowired
    public CartService(CartRepository cartRepository, AccountRepository accountRepository, CartItemService service){
        this.repository = cartRepository;
        this.accountRepository = accountRepository;
        this.cartItemService = service;
    }
    public Iterable<CartItem> GET_USER_CART(Long id){
        Account user = emptyCheck(this.accountRepository.findById(id));
        Cart cart = this.repository.findByAccount(user);
        return this.cartItemService.GET_BY_CART(cart.id);
    }
    public void CREATE_CART(Long id){
        Account user = emptyCheck(this.accountRepository.findById(id));
        Cart cart = new Cart(user);
        this.repository.save(cart);
    }
}
