package net.yorksolutions.storebackend.Categories;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static net.yorksolutions.storebackend.Helpers.emptyCheck;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Iterable<Category> GET_ALL_CATEGORIES(){
        return this.categoryRepository.findAll();
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
    public void delete(Long id) {
        Category category = emptyCheck(categoryRepository.findById(id));
        categoryRepository.delete(category);
    }
}
