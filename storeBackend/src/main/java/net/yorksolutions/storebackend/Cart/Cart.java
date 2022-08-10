package net.yorksolutions.storebackend.Cart;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.storebackend.Accounts.Account;

import javax.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;
    @JsonProperty
    @ManyToOne
    public Account account;


    public Cart(){}
    public Cart(Account account){
        this.account = account;
    }

}
