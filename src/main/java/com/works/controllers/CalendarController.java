package com.works.controllers;

import com.works.entities.Meeting;
import com.works.entities.User;
import com.works.repositories.MeetingRepository;
import com.works.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@Controller
@RequestMapping("/calendar")
public class CalendarController {

    final MeetingRepository mRepo;
    final UserService uService;

    public CalendarController(MeetingRepository mRepo, UserService uService) {
        this.mRepo = mRepo;
        this.uService = uService;
    }

    @GetMapping("")
    public String calendar(){
        return "calendar";
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Meeting meeting, BindingResult bResult){

        if(bResult.hasErrors()){
            return bResult.toString();
        }
        User user = new User();
        user.setId(uService.getUserId());
        meeting.setDoctor(user);
        return mRepo.save(meeting).getId().toString();
    }

    @GetMapping("/get/{u_id}/{week}")
    @ResponseBody
    public List<Meeting> get(@PathVariable Integer u_id, @PathVariable Integer week){

        List<Meeting> returnList = new ArrayList<>();
        List<Meeting> meetings = mRepo.findByDoctor_Id(u_id);
        Calendar calendar = new GregorianCalendar();

        for(Meeting meeting : meetings){
            calendar.setTime(meeting.getDate());
            if(week == calendar.get(Calendar.WEEK_OF_YEAR)){
                returnList.add(meeting);
            }
        }

        return returnList;
    }

}
