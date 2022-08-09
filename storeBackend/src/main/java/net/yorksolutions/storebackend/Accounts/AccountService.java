

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

    public void create(String username, String password, String name, String email, String status) {
        if (username == null || password == null || name == null || email == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Optional<Account> existingAccount = accountRepository.findByUsername(username);
        if (existingAccount.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Account account = new Account(username, password, name, email, status);
        accountRepository.save(account);
    }

}