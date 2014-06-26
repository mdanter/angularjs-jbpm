package com.redhat.jbpm.angularjs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Path("/rest")
public class RestService {

	private static final Logger LOG = LoggerFactory.getLogger(RestService.class);

	@Inject
	private MockJBPM mockJbpm;

	@POST
	@Path("/process/start/{processId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response startProcess(@PathParam("processId") String processId) {

		Map<String, Map<String,Long>> process = new HashMap<String, Map<String,Long>>();
		Map<String, Long> processInstanceId = new HashMap<String, Long>();
		
		processInstanceId.put("processId", Math.round(Math.random() * 23));
		process.put("process", processInstanceId);
		
		return Response.ok(process, MediaType.APPLICATION_JSON).build();
	}

	@GET
	@Path("/task/assigned/{user}")
	public Response assigned(@PathParam("user") String user) {

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@GET
	@Path("/task/available/{user}")
	public Response available(@PathParam("user") String user) {

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAvailableTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/task/claim/{user}/{taskId}")
	public Response claim(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.claim(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/task/start/{user}/{taskId}")
	public Response start(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.start(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/task/complete/{user}/{taskId}")
	public Response complete(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.complete(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/task/release/{user}/{taskId}")
	public Response release(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.release(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}
}
