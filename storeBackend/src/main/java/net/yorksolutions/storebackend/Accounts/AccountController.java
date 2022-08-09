package net.yorksolutions.storebackend.Accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        accountService.create(requestBody.username, requestBody.password, requestBody.name, requestBody.email, requestBody.status);
    }

}
class AccountAuthRequest {
    public String username;
    public String password;

    public String name;

    public String email;

    public String status;
}