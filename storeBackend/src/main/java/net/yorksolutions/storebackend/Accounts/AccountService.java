

package net.yorksolutions.storebackend.Accounts;

import net.yorksolutions.storebackend.Cart.Cart;
import net.yorksolutions.storebackend.Cart.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class AccountService {

    CartRepository cartRepository;
    AccountRepository accountRepository;
    public AccountService(AccountRepository accountRepository, CartRepository cartRepository) {
        this.cartRepository =cartRepository;
        this.accountRepository = accountRepository;
    }

    public Iterable<Account> GET_ALL_USERS(){
        return this.accountRepository.findAll();
    }

    public void create(String username, String password, String name, String email, String status) {
        if (Objects.equals(username, "") || Objects.equals(password, "") || Objects.equals(name, "") || Objects.equals(email, "")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Optional<Account> existingAccount = accountRepository.findByUsername(username);
        if (existingAccount.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Account account = new Account(username, password, name, email, status);
        Cart cart = new Cart(account);
        cartRepository.save(cart);
        accountRepository.save(account);
    }
    public Optional<Account> login(String username, String password) {
        Optional<Account> foundAccount = accountRepository.findByUsernameAndPassword(username, password);
        if (foundAccount.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return foundAccount;
    }
    public void edit(AccountAuthRequest requestBody) {
        Optional<Account> existingAccount = accountRepository.findById(requestBody.id);
        if (existingAccount.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        existingAccount.get().name = requestBody.name;
        existingAccount.get().username = requestBody.username;
        existingAccount.get().email = requestBody.email;
        existingAccount.get().password = requestBody.password;
        existingAccount.get().status = requestBody.status;

        accountRepository.save(existingAccount.get());
    }
    public void delete(Long id) {
        Optional<Account> existingAccount = accountRepository.findById(id);
        if (existingAccount.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        accountRepository.delete(existingAccount.get());
    }

}