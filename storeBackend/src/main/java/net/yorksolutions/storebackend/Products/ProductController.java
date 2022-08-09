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

    }
}
