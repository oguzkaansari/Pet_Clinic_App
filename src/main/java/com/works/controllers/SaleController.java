package com.works.controllers;

import com.works.entities.Customer;
import com.works.entities.PayStatus;
import com.works.entities.Receipt;
import com.works.entities.Sale;
import com.works.repositories.ReceiptRepository;
import com.works.repositories.SaleRepository;
import com.works.repositories.TicketRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/sale")
public class SaleController {

    final ReceiptRepository rRepo;
    final SaleRepository sRepo;

    public SaleController(ReceiptRepository rRepo, SaleRepository sRepo) {
        this.rRepo = rRepo;
        this.sRepo = sRepo;
    }

    @GetMapping("/form")
    public String form(){
        return "sale-form";
    }

    @GetMapping("/list")
    public String list(){
        return "sale-list";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Sale> all(){
        return sRepo.findAll();
    }

    @GetMapping("/receipt/{id}")
    @ResponseBody
    public List<Receipt> receipt(@PathVariable Integer id){

        return rRepo.findByCustomer_IdAndStatus_Id(id, 2); // ödenmemiş reçete
    }

    @GetMapping("/sales/{id}")
    @ResponseBody
    public List<Sale> sales(@PathVariable Integer id){

        return sRepo.findByReceipt_Id(id);
    }

    @GetMapping("/search/{key}")
    @ResponseBody
    public List<Sale> search(@PathVariable String key){

        if(key.isEmpty()){
            return sRepo.findAll();
        }

        return sRepo.searchSaleByKey(key);
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Receipt receipt, BindingResult bResult){

        String result = "-1";
        if(bResult.hasErrors()) {
            return bResult.toString();
        }else{
            if(receipt.getStatus().getId() != 1){
                PayStatus status = new PayStatus();
                status.setId(2);
                receipt.setStatus(status);
            }
            int save_id = rRepo.save(receipt).getId();
            if(save_id != 0){
                result = "1";
            }
        }
        return result;
    }

}
