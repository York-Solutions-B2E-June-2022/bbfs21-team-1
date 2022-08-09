
package net.yorksolutions.storebackend.Accounts;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long Id;
    String username;
    String password;
    String name;
    String email;
    String status;

    public Account() {}

    public Account(String username, String password, String name, String email, String status) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }
}