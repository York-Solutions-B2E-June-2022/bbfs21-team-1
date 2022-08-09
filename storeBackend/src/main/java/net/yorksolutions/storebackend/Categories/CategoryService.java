package net.yorksolutions.storebackend.Categories;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public void create(String name) {
        Optional<Category> existingCategory = categoryRepository.findByName(name);
        if (existingCategory.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Category category = new Category(name);
        categoryRepository.save(category);
    }

    public void edit(CategoryAuthRequest requestBody) {
        Optional<Category> existingCategory = categoryRepository.findById(requestBody.id);
        if (existingCategory.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        existingCategory.get().name = requestBody.name;

        categoryRepository.save(existingCategory.get());
    }
    public void delete(CategoryAuthRequest requestBody) {
        Optional<Category> existingCategory = categoryRepository.findById(requestBody.id);
        categoryRepository.delete(existingCategory.get());
    }
}
