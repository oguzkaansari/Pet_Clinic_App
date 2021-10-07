package com.works.controllers;

import com.works.entities.*;
import com.works.repositories.CustomerRepository;
import com.works.repositories.GenderRepository;
import com.works.repositories.RaceRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    final CustomerRepository cRepo;
    final RaceRepository rRepo;
    final GenderRepository gRepo;

    public CustomerController(CustomerRepository cRepo, RaceRepository rRepo, GenderRepository gRepo) {
        this.cRepo = cRepo;
        this.rRepo = rRepo;
        this.gRepo = gRepo;
    }

    @GetMapping("/form/{c_id}")
    public String form(@PathVariable Integer c_id, Model model){
        if(c_id != 0){
            Optional<Customer> op = cRepo.findById(c_id);

            model.addAttribute("name", op);
        }
        return "customer-form";
    }

    @GetMapping("/list")
    public String list(){
        return "customer-list";
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Customer customer, BindingResult bResult){

        String result = "-1";
        if(bResult.hasErrors()){
            return bResult.toString();
        }else if(customer.getPets().size() == 0){
            result = "0";
        }else{
            ActiveStatus status = new ActiveStatus();
            status.setId(1);
            customer.setStatus(status);
            int save_id = cRepo.save(customer).getId();
            if(save_id != 0){
                result = "1";
            }
        }
        return result;
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Customer> all(){
        return cRepo.findAll();
    }

    @GetMapping("/search/{id}/{key}")
    @ResponseBody
    public List<Customer> search(@PathVariable String key, @PathVariable Integer id){

        if(key.isEmpty() && id == 0 ){
            return cRepo.findAll();
        }
        if(key.isEmpty()){
            return cRepo.findByStatus_Id(id);
        }
        if(id == 0){
            return cRepo.searchCustomerByKey(key);
        }
        return cRepo.searchCustomerByKeyAndId(key, id);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public String delete(@PathVariable Integer id){
        try {
            cRepo.deleteById(id);
        }catch (Exception e){
            return "0";
        }
        return "1";
    }

    @GetMapping("/races")
    @ResponseBody
    public List<Race> races(){
        return rRepo.findAll();
    }

    @GetMapping("/genders")
    @ResponseBody
    public List<Gender> genders(){
        return gRepo.findAll();
    }
}
