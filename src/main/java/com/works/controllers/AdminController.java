package com.works.controllers;

import com.works.entities.ActiveStatus;
import com.works.entities.Role;
import com.works.entities.User;
import com.works.repositories.RoleRepository;
import com.works.repositories.UserRepository;
import com.works.services.UserService;
import com.works.utils.Util;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Controller
@RequestMapping("/admin")
public class AdminController {

    final RoleRepository rRepo;
    final UserRepository uRepo;
    final UserService uService;

    public AdminController(RoleRepository rRepo, UserRepository uRepo, UserService uService) {
        this.rRepo = rRepo;
        this.uRepo = uRepo;
        this.uService = uService;
    }

    @GetMapping("/list")
    public String list(){
        return "admin-list";
    }

    @GetMapping("/form/{u_id}")
    public String form(@PathVariable Integer u_id, Model model){
        if(u_id != 0){
            model.addAttribute("user", uRepo.findById(u_id));
        }
        return "admin-form";
    }

    @GetMapping("/roles")
    @ResponseBody
    public List<Role> roles(){
        return rRepo.findAll();
    }

    @GetMapping("/users")
    @ResponseBody
    public List<User> users(){
        return uRepo.findAll();
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public String delete(@PathVariable Integer id){
        try {
            uRepo.deleteById(id);
        }catch (Exception e){
            return "0";
        }
        return "1";
    }

    @PostMapping("/register")
    public String register(@Valid User user,
                           @RequestParam Integer roleId,
                           @RequestParam MultipartFile file,
                           BindingResult bResult) throws AuthenticationException {

        if(bResult.hasErrors()){
            return bResult.toString();
        }else{

            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String ext = fileName.substring(fileName.length()-5, fileName.length());
            String uui = UUID.randomUUID().toString();
            fileName = uui + ext;
            try {
                Path path = Paths.get(Util.IMG_UPLOAD_DIR + fileName);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
            }


            ActiveStatus status = new ActiveStatus();
            status.setId(1);
            user.setStatus(status);

            Role role = new Role();
            role.setId(roleId);
            user.setRole(role);

            user.setEnabled(true);
            user.setTokenExpired(true);
            user.setImg(fileName);

            uService.register(user);

            return "admin-form";
        }
    }

}
