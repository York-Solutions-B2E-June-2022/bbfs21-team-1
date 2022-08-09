package net.yorksolutions.storebackend.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import static net.yorksolutions.storebackend.

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
//    public Product GET_PRODUCT(Long id){
//        return emptyCheck
//        return repository.findById(id);
//    }
}
