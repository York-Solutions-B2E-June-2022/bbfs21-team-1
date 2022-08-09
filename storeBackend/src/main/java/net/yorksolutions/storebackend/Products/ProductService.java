package net.yorksolutions.storebackend.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static net.yorksolutions.storebackend.Helpers.emptyCheck;
import static net.yorksolutions.storebackend.Helpers.nullCheck;

@Service
public class ProductService {

    ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.repository = productRepository;
    }

    public Iterable<Product> GET_PRODUCTS() {
        return repository.findAll();
    }

    public Product GET_PRODUCT(Long id) {
        return emptyCheck(repository.findById(id));
    }

    public void CREATE_PRODUCT(ProductRequest requestBody) {
        System.out.println("creating product...");
        Product newProduct = new Product(
                nullCheck(requestBody.name),
                nullCheck(requestBody.description),
                nullCheck(requestBody.available),
                nullCheck(requestBody.mapPrice),
                nullCheck(requestBody.retailPrice),
                nullCheck(requestBody.salePrice),
                nullCheck(requestBody.saleDate)
                );
        this.repository.save(newProduct);
    }
    public void EDIT_PRODUCT(ProductRequest requestBody){
        System.out.println("editing product...");
        Product product = emptyCheck(repository.findById(requestBody.id));
        product.name = requestBody.name;
        product.description = requestBody.description;
        product.available = requestBody.available;
        product.mapPrice = requestBody.mapPrice;
        product.retailPrice = requestBody.retailPrice;
        product.salePrice = requestBody.salePrice;
        product.saleDate = requestBody.saleDate;
        this.repository.save(product);
    }
}
