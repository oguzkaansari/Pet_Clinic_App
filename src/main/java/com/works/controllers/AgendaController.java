package com.works.controllers;

import com.works.entities.Note;
import com.works.entities.User;
import com.works.repositories.NoteRepository;
import com.works.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/agenda")
public class AgendaController {

    final NoteRepository nRepo;
    final UserService uService;

    public AgendaController(NoteRepository nRepo, UserService uService) {
        this.nRepo = nRepo;
        this.uService = uService;
    }


    @GetMapping("")
    public String agenda(){
        return "agenda";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Note> all(){

        return nRepo.findByUser_Id(uService.getUserId());
    }

    @PostMapping("/add")
    @ResponseBody
    public String add(@RequestBody @Valid Note note, BindingResult bResult){

        String result = "0";
        if(bResult.hasErrors()){
            return bResult.toString();
        }else{

            User user = new User();
            user.setId(uService.getUserId());
            note.setUser(user);

            int save_id = nRepo.save(note).getId();
            if(save_id != 0){
                result = "1";
            }
        }
        return result;
    }
}
