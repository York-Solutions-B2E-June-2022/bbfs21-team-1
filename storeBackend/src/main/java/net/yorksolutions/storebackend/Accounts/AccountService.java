

package net.yorksolutions.storebackend.Accounts;

import net.yorksolutions.storebackend.Cart.Cart;
import net.yorksolutions.storebackend.Cart.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

import static net.yorksolutions.storebackend.Helpers.*;

@Service
public class AccountService {

    CartRepository cartRepository;
    AccountRepository accountRepository;
    public AccountService(AccountRepository accountRepository, CartRepository cartRepository) {
        this.accountRepository = accountRepository;
        this.cartRepository = cartRepository;
    }

    public Iterable<Account> GET_ALL_USERS(){
        return this.accountRepository.findAll();
    }

    public Account create(AccountAuthRequest requestBody) {
        checkValues(new String[]{requestBody.username, requestBody.password, requestBody.name, requestBody.email, requestBody.status});
        presenceCheck(accountRepository.findByUsername(requestBody.username)); //returns BAD REQUEST if true
        if ( accountRepository.count() == 0 ) {requestBody.status = "Admin";}
        Account account = new Account(requestBody.username, requestBody.password, requestBody.name, requestBody.email, requestBody.status);
        Cart cart = new Cart(account);
        accountRepository.save(account);
        cartRepository.save(cart);
        return account;
    }

    public Account login(String username, String password) {
        return emptyCheck(accountRepository.findByUsernameAndPassword(username, password));
    }

    public void edit(AccountAuthRequest requestBody) {
        Account existingAccount = emptyCheck(accountRepository.findById(requestBody.id));
        existingAccount.name = requestBody.name;
        existingAccount.username = requestBody.username;
        existingAccount.email = requestBody.email;
        existingAccount.password = requestBody.password;
        existingAccount.status = requestBody.status;
        accountRepository.save(existingAccount);
    }
    public void delete(Long id) {
        Account existingAccount = emptyCheck(accountRepository.findById(id));
        Cart cart = cartRepository.findByAccount(existingAccount);
        cartRepository.delete(cart);
        accountRepository.delete(existingAccount);
    }

}