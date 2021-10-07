package com.works.controllers;

import com.works.entities.Product;
import com.works.entities.Supplier;
import com.works.repositories.ProductRepository;
import com.works.repositories.SupplierRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/supplier")
public class SupplierController {

    final SupplierRepository sRepo;
    final ProductRepository pRepo;

    public SupplierController(SupplierRepository sRepo, ProductRepository pRepo) {
        this.sRepo = sRepo;
        this.pRepo = pRepo;
    }

    @GetMapping("")
    public String supplier(){
        return "supplier";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Supplier> all(){
        return sRepo.findAll();
    }

    @GetMapping("/products/{id}")
    @ResponseBody
    public List<Product> products(@PathVariable Integer id){
        return pRepo.findBySupplier_Id(id);
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Supplier supplier, BindingResult bResult){

        String result = "0";
        if(bResult.hasErrors()){
            return bResult.toString();
        }else{
            int save_id = sRepo.save(supplier).getId();
            if(save_id != 0){
                result = "1";
            }
        }
        return result;
    }
}
