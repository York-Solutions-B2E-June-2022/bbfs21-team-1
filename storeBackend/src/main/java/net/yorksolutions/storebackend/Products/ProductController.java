package net.yorksolutions.storebackend.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {
    ProductService service;
    @Autowired
    public ProductController(ProductService productService) {
        this.service = productService;
    }
    @GetMapping
    public Iterable<Product> getProducts(){
        return service.GET_PRODUCTS();
    }
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return service.GET_PRODUCT(id);
    }
    @GetMapping("/category")
    public Iterable<Product> getByCategory(@RequestParam String name){
        return this.service.GET_BY_CATEGORY(name);
    }
    @PostMapping
    public void createProduct(@RequestBody ProductRequest requestBody){
        System.out.println("...creating");
        this.service.CREATE_PRODUCT(requestBody);
    }
    @PutMapping
    public void editProduct(@RequestBody ProductRequest requestBody){
        this.service.EDIT_PRODUCT(requestBody);
    }
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){this.service.DELETE_PRODUCT(id);}
}
