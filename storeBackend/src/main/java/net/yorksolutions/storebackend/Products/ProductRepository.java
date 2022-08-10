package net.yorksolutions.storebackend.Products;

import net.yorksolutions.storebackend.Categories.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    ArrayList<Product> getByCategory(Category category);
}
