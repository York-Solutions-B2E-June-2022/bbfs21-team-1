package net.yorksolutions.storebackend.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.repository = productRepository;
    }
    public Iterable<Product> GET_PRODUCTS(){
        return repository.findAll();
    }
    public Product GET_PRODUCT(Long id){
//        return repository.findById(id);
    }
}
