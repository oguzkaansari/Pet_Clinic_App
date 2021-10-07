package com.works.controllers;

import com.works.entities.PayStatus;
import com.works.entities.Sale;
import com.works.entities.Supplier;
import com.works.entities.Ticket;
import com.works.repositories.SupplierRepository;
import com.works.repositories.TicketRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/buy")
public class BuyController {

    final TicketRepository tRepo;
    final SupplierRepository sRepo;

    public BuyController(TicketRepository tRepo, SupplierRepository sRepo) {
        this.tRepo = tRepo;
        this.sRepo = sRepo;
    }

    @GetMapping("/form")
    public String form(){
        return "buy-form";
    }

    @GetMapping("/list")
    public String list(){
        return "buy-list";
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Ticket ticket, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        PayStatus status = new PayStatus();
        status.setId(2);
        ticket.setStatus(status);
        return tRepo.save(ticket).getId().toString();
    }

    @GetMapping("/all/{id}")
    @ResponseBody
    public List<Ticket> form(@PathVariable Integer id){

        if (id == 0){
            return tRepo.findAll();
        }
        return tRepo.findBySupplier_Id(id);
    }

    @GetMapping("/search/{key}")
    @ResponseBody
    public List<Ticket> search(@PathVariable String key){

        if(key.isEmpty()){
            return tRepo.findAll();
        }

        return tRepo.searchTicketByKey(key);
    }
}
