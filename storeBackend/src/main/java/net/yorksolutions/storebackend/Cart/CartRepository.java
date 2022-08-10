package net.yorksolutions.storebackend.Cart;

import net.yorksolutions.storebackend.Accounts.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    Cart findByAccount(Account account);
}
