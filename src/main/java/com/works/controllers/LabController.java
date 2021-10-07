package com.works.controllers;

import com.works.entities.*;
import com.works.repositories.PetRepository;
import com.works.repositories.TestRepository;
import com.works.repositories.TestTypeRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/lab")
public class LabController {

    final PetRepository pRepo;
    final TestTypeRepository typeRepo;
    final TestRepository testRepo;

    public LabController(PetRepository pRepo, TestTypeRepository typeRepo, TestRepository testRepo) {
        this.pRepo = pRepo;
        this.typeRepo = typeRepo;
        this.testRepo = testRepo;
    }

    @GetMapping("/list")
    public String list(){
        return "lab-list";
    }

    @GetMapping("/form")
    public String form(){
        return "lab-form";
    }

    @GetMapping("/pets")
    @ResponseBody
    public List<Pet> allPets(){
        return pRepo.findAll();
    }

    @GetMapping("/tests")
    @ResponseBody
    public List<Test> allTests(){
        return testRepo.findAll();
    }


    @GetMapping("/types")
    @ResponseBody
    public List<TestType> allTypes(){
        return typeRepo.findAll();
    }

    @GetMapping("/search/{id}/{key}")
    @ResponseBody
    public List<Test> search(@PathVariable String key, @PathVariable Integer id){

        if(key.isEmpty() && id == 0 ){
            return testRepo.findAll();
        }
        if(key.isEmpty()){
            return testRepo.findByStatus_Id(id);
        }
        if(id == 0){
            return testRepo.searchTestByKey(key);
        }
        return testRepo.searchTestByKeyAndId(key, id);
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Test test, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        TestStatus status = new TestStatus();
        status.setId(1);
        test.setStatus(status);
        return testRepo.save(test).getId().toString();
    }

}
