package com.works.controllers;

import com.works.entities.*;
import com.works.repositories.ProductRepository;
import com.works.repositories.TaxRepository;
import com.works.repositories.ProductTypeRepository;
import com.works.repositories.UnitRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {

    final ProductRepository pRepo;
    final UnitRepository uRepo;
    final ProductTypeRepository typeRepo;
    final TaxRepository taxRepo;

    public ProductController(ProductRepository pRepo, UnitRepository uRepo, ProductTypeRepository typeRepo, TaxRepository taxRepo) {
        this.pRepo = pRepo;
        this.uRepo = uRepo;
        this.typeRepo = typeRepo;
        this.taxRepo = taxRepo;
    }

    @GetMapping("")
    public String product(){
        return "product";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Product> allProducts(){
        return pRepo.findAll();
    }

    @GetMapping("/units")
    @ResponseBody
    public List<Unit> units(){
        return uRepo.findAll();
    }

    @GetMapping("/types")
    @ResponseBody
    public List<ProductType> allTypes(){
        return typeRepo.findAll();
    }

    @GetMapping("/taxes")
    @ResponseBody
    public List<Tax> allTaxes(){
        return taxRepo.findAll();
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Product product, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        return pRepo.save(product).getId().toString();
    }
}
