

package net.yorksolutions.storebackend.Accounts;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AccountService {

    AccountRepository accountRepository;
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void create(Long id, String username, String password, String name, String email, String status) {
        if (username == null || password == null || name == null || email == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Optional<Account> existingAccount = accountRepository.findByUsername(username);
        if (existingAccount.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Account account = new Account(id, username, password, name, email, status);
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
    public void delete(AccountAuthRequest requestBody) {
        Optional<Account> existingAccount = accountRepository.findById(requestBody.id);
        if (existingAccount.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        accountRepository.delete(existingAccount.get());
    }

}