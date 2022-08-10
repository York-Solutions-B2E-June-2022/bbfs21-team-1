package net.yorksolutions.storebackend.Products;

import net.yorksolutions.storebackend.Categories.Category;
import net.yorksolutions.storebackend.Categories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static net.yorksolutions.storebackend.Helpers.emptyCheck;
import static net.yorksolutions.storebackend.Helpers.nullCheck;

@Service
public class ProductService {

    ProductRepository repository;
    CategoryRepository categoryRepository;
    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.repository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Iterable<Product> GET_PRODUCTS() {
        return repository.findAll();
    }

    public Product GET_PRODUCT(Long id) {
        return emptyCheck(repository.findById(id));
    }
    public Iterable<Product> GET_BY_CATEGORY(String category){
        Category param = emptyCheck(this.categoryRepository.findByName(category));
        return this.repository.getByCategory(param);
    }

    public void CREATE_PRODUCT(ProductRequest requestBody) {
        Category category = emptyCheck(this.categoryRepository.findByName(requestBody.category));
        System.out.println(requestBody.mapPrice);
        Product newProduct = new Product(
                nullCheck(requestBody.name),
                nullCheck(requestBody.description),
                category,
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
    public void DELETE_PRODUCT(Long id){
        this.repository.deleteById(id);
    }
}
