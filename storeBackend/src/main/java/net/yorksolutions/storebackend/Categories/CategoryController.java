package net.yorksolutions.storebackend.Categories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Category")
@CrossOrigin
public class CategoryController {

    CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public Iterable<Category> getAllCategories(){
        return this.categoryService.GET_ALL_CATEGORIES();
    }

    @PostMapping("/create")
    public void create(@RequestBody CategoryAuthRequest requestBody) {
        categoryService.create(requestBody.name);

    }
    @PutMapping
    public void edit(@RequestBody CategoryAuthRequest requestBody) {
        categoryService.edit(requestBody);
    }

    @DeleteMapping
    public void delete(@RequestBody CategoryAuthRequest requestBody) {
        categoryService.delete(requestBody);
    }
}

class CategoryAuthRequest {

    public Long id;

    public String name;

}