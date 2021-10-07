package com.works.controllers;

import com.works.entities.*;
import com.works.repositories.PayTypeRepository;
import com.works.repositories.ReceiptRepository;
import com.works.repositories.TicketRepository;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/chest")
public class ChestController {

    final TicketRepository tRepo;
    final ReceiptRepository rRepo;
    final PayTypeRepository pRepo;

    public ChestController(TicketRepository tRepo, ReceiptRepository rRepo, PayTypeRepository pRepo) {
        this.tRepo = tRepo;
        this.rRepo = rRepo;
        this.pRepo = pRepo;
    }


    @GetMapping("/list")
    public String chest(){
        return "chest-list";
    }

    @GetMapping("/payin")
    public String payIn(){
        return "chest-payin";
    }

    @GetMapping("/payout")
    public String payOut(){
        return "chest-payout";
    }

    @GetMapping("/receipts/{status_id}")
    @ResponseBody
    public List<Receipt> receipts(@PathVariable Integer status_id){

        if(status_id == 0){
            return rRepo.findAll();
        }

        return rRepo.findByStatus_Id(status_id);
    }

    @GetMapping("/tickets/{status_id}")
    @ResponseBody
    public List<Ticket> tickets(@PathVariable Integer status_id){

        if(status_id == 0){
            return tRepo.findAll();
        }

        return tRepo.findByStatus_Id(status_id);
    }

    @PostMapping("/payin/pay")
    @ResponseBody
    public String add(@RequestBody @Valid Receipt receipt, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        PayStatus status = new PayStatus();
        status.setId(1);
        receipt.setStatus(status);

        return rRepo.save(receipt).getId().toString();
    }

    @GetMapping("/payTypes")
    @ResponseBody
    public List<PayType> payTypes(){
        return pRepo.findAll();
    }
}
