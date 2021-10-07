package com.works.controllers;

import com.works.entities.Category;
import com.works.entities.CustomerGroup;
import com.works.repositories.CategoryRepository;
import com.works.repositories.CustomerGroupRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/specifications")
public class SpecificationsController {

    final CustomerGroupRepository cGroupRepo;
    final CategoryRepository catRepo;

    public SpecificationsController(CustomerGroupRepository cGroupRepo, CategoryRepository catRepo) {
        this.cGroupRepo = cGroupRepo;
        this.catRepo = catRepo;
    }

    @GetMapping("/group")
    public String customerGroup(){
        return "specifications-group";
    }


    @PostMapping("/group/add")
    @ResponseBody
    public String add(@RequestBody @Valid CustomerGroup customerGroup, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        return cGroupRepo.save(customerGroup).getId().toString();
    }
    @GetMapping("/group/all")
    @ResponseBody
    public List<CustomerGroup> allGroups(){
        return cGroupRepo.findAll();
    }

    @DeleteMapping("/group/delete/{g_id}")
    @ResponseBody
    public String deleteGroup(@PathVariable Integer g_id){
        try {
            cGroupRepo.deleteById(g_id);
        }catch (Exception e){
            return "0";
        }
        return "1";
    }

    @GetMapping("/category")
    public String productCategory(){
        return "specifications-category";
    }

    @PostMapping("/category/add")
    @ResponseBody
    public String add(@RequestBody @Valid Category category, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        return catRepo.save(category).getId().toString();
    }

    @GetMapping("/category/all")
    @ResponseBody
    public List<Category> allCategories(){
        return catRepo.findAll();
    }

    @DeleteMapping("/category/delete/{id}")
    @ResponseBody
    public String deleteCategory(@PathVariable Integer id){
        try {
            catRepo.deleteById(id);
        }catch (Exception e){
            return "0";
        }
        return "1";
    }
}