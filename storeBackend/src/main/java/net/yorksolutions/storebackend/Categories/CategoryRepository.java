package net.yorksolutions.storebackend.Categories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository <Category, Long> {
    Optional<Category> findByCategory(String category);

}
