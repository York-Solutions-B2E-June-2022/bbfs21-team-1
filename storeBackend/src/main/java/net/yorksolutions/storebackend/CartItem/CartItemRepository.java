package net.yorksolutions.storebackend.CartItem;

import net.yorksolutions.storebackend.Cart.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CartItemRepository extends CrudRepository<CartItem, Long> {
    Iterable<CartItem> findAllByCart(Cart cart);
}
