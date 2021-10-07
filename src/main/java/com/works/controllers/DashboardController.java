package com.works.controllers;

import com.works.entities.Meeting;
import com.works.entities.Note;
import com.works.repositories.MeetingRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
public class DashboardController {

    final MeetingRepository mRepo;

    public DashboardController(MeetingRepository mRepo) {
        this.mRepo = mRepo;
    }

    @GetMapping("/dashboard")
    public String dashboard(){
        return "dashboard";
    }

    @GetMapping("/meetings/{idx}")
    @ResponseBody
    public List<Meeting> meetings(@PathVariable Integer idx){

        List<Meeting> ls = mRepo.findAll();
        Date today = Calendar.getInstance().getTime();
        List<Meeting> resultList = new ArrayList<>();

        if(idx == 0){
            for(Meeting m : ls){
                if(today.after(m.getDate())){
                    resultList.add(m);
                }
            }
        }
        if(idx == 1){
            for(Meeting m : ls){
                if(today.before(m.getDate())){
                    resultList.add(m);
                }
            }
        }
        return resultList;
    }
}
