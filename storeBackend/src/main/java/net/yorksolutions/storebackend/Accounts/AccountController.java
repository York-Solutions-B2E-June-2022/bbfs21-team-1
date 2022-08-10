package net.yorksolutions.storebackend.Accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {

    AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/create")
    public void create(@RequestBody AccountAuthRequest requestBody) {
        accountService.create(requestBody.id, requestBody.username, requestBody.password, requestBody.name, requestBody.email, requestBody.status);
    }
    @PostMapping("/login")
    public Optional<Account> login(@RequestBody AccountAuthRequest requestBody) {
        return accountService.login(requestBody.username, requestBody.password);
    }
    @PutMapping("/edit")
    public void edit(@RequestBody AccountAuthRequest requestBody) {
        this.accountService.edit(requestBody);
    }
    @DeleteMapping
    public void delete(@RequestBody AccountAuthRequest requestBody) {
        this.accountService.delete(requestBody);
    }


}
class AccountAuthRequest {
    public Long id;
    public String username;
    public String password;

    public String name;

    public String email;

    public String status;
}