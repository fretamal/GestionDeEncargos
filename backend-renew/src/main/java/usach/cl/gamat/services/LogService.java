package usach.cl.gamat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamat.entities.Log;
import usach.cl.gamat.facadeBD.ServiceBdImp;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/logs")
public class LogService {
    @Autowired
    private ServiceBdImp serviceBdImp;

    @GetMapping("/")
    @ResponseBody
    public Iterable<Log> getAllLogs(){return serviceBdImp.findAllLog();}

    @GetMapping("/{idRequest}/requests")
    @ResponseBody
    public Iterable<Log> getLogsByRequest(@PathVariable Integer idRequest){
        List<Log> logs = new ArrayList<>();
        for (Log log:serviceBdImp.findAllLog()) {
            if(log.getRequest().getIdRequest() == idRequest){
                logs.add(log);
            }
        }
        return logs;
    }
    @DeleteMapping("/{id}/delete")
    @ResponseBody
    public HttpStatus deleteLog(@PathVariable Integer id){
        if(serviceBdImp.deleteLog(id)){
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
