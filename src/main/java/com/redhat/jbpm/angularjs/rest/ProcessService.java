package com.redhat.jbpm.angularjs.rest;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.redhat.jbpm.angularjs.bpm.MockJBPM;

@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Path("/process")
public class ProcessService {

	private static final Logger LOG = LoggerFactory.getLogger(ProcessService.class);

	@POST
	@Path("/start/{processId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response startProcess(@PathParam("processId") String processId) {

		Map<String, Map<String,Long>> process = new HashMap<String, Map<String,Long>>();
		Map<String, Long> processInstanceId = new HashMap<String, Long>();
		
		processInstanceId.put("processId", Math.round(Math.random() * 23));
		process.put("process", processInstanceId);
		
		return Response.ok(process, MediaType.APPLICATION_JSON).build();
	}


}
