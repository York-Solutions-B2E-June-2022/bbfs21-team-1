package net.yorksolutions.storebackend.CartItem;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.storebackend.Cart.Cart;
import net.yorksolutions.storebackend.Products.Product;

import javax.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;
    @JsonProperty
    @ManyToOne
    public Cart cart;
    @JsonProperty
    @OneToOne
    public Product product;
    @JsonProperty
    public int quantity;
    @JsonProperty
    public Boolean pastOrder;

    public CartItem(){}
    public CartItem(Product product, Cart cart){
        this.cart = cart;
        this.product = product;
        this.quantity = 1;
        this.pastOrder = false;
    }
}
