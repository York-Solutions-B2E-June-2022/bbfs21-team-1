package net.yorksolutions.storebackend.CartItem;

import net.yorksolutions.storebackend.Cart.Cart;
import net.yorksolutions.storebackend.Cart.CartRepository;
import net.yorksolutions.storebackend.Products.Product;
import net.yorksolutions.storebackend.Products.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static net.yorksolutions.storebackend.Helpers.emptyCheck;

@Service
public class CartItemService {

    CartItemRepository repository;
    CartRepository cartRepository;
    ProductRepository productRepository;
    @Autowired
    public CartItemService(CartItemRepository repo, CartRepository repository, ProductRepository productRepository){
        this.repository = repo;
        this.cartRepository = repository;
        this.productRepository = productRepository;
    }
    public Iterable<CartItem> GET_BY_CART(Long id){
        Cart cart = emptyCheck(this.cartRepository.findById(id));
        return this.repository.findAllByCart(cart);
    }
    public void ADD_ITEM(CartItemRequest requestBody){
        Cart cart = emptyCheck(this.cartRepository.findById(requestBody.cartId));
        Product product = emptyCheck(this.productRepository.findById(requestBody.productId));
        CartItem item = new CartItem(
            product,
            cart
        );
        this.repository.save(item);
    }
    public void SET_QTY(int quantity, Long itemId){
        CartItem item = emptyCheck(this.repository.findById(itemId));
        item.quantity = quantity;
        this.repository.save(item);
    }
    public void SET_PURCHASED(Long itemId){
        CartItem item = emptyCheck(this.repository.findById(itemId));
        item.pastOrder = true;
        this.repository.save(item);
    }
    public void REMOVE_ITEM(Long id){
        this.repository.deleteById(id);
    }
}
