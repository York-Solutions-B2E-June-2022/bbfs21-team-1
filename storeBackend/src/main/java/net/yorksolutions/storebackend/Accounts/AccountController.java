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

    @GetMapping
    public Iterable<Account> getAllUsers(){
        return this.accountService.GET_ALL_USERS();
    }

    @PostMapping("/create")
    public Account create(@RequestBody AccountAuthRequest requestBody) {
        return accountService.create(requestBody);
    }
    @PostMapping("/login")
    public Account login(@RequestBody AccountAuthRequest requestBody) {
        return accountService.login(requestBody.username, requestBody.password);
    }
    @PutMapping("/edit")
    public void edit(@RequestBody AccountAuthRequest requestBody) {
        this.accountService.edit(requestBody);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.accountService.delete(id);
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