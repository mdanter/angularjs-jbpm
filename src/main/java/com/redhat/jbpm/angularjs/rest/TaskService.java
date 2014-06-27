package com.redhat.jbpm.angularjs.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.redhat.jbpm.angularjs.bpm.MockJBPM;
import com.redhat.jbpm.angularjs.model.LoanOrder;

@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Path("/task")
public class TaskService {

	private static final Logger LOG = LoggerFactory.getLogger(TaskService.class);

	@Inject
	private MockJBPM mockJbpm;

	@GET
	@Path("/assigned/{user}")
	public Response assigned(@PathParam("user") String user) {

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/get-data/{user}/{taskId}")
	public Response getData(@PathParam("user") String user, @PathParam("taskId") Long taskId) {

		Map<String, LoanOrder> taskData = new HashMap<String, LoanOrder>();
		
		LoanOrder order = new LoanOrder();
		order.setFirstName("Sample");
		order.setLastName("Sample");
		order.setLoanAmount(Math.round(Math.random()*1000*taskId));
		
		taskData.put("loanOrder", order);

		return Response.ok(taskData, MediaType.APPLICATION_JSON).build();
	}

	@GET
	@Path("/available/{user}")
	public Response available(@PathParam("user") String user) {

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAvailableTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/claim/{user}/{taskId}")
	public Response claim(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.claim(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/start/{user}/{taskId}")
	public Response start(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.start(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/complete/{user}/{taskId}")
	public Response complete(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.complete(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/release/{user}/{taskId}")
	public Response release(@PathParam("user") String user, @PathParam("taskId") Long taskId) {
		mockJbpm.release(user, taskId);

		Map<String, List> task = new HashMap<String, List>();

		task.put("task", mockJbpm.getAssignedTasks());

		return Response.ok(task, MediaType.APPLICATION_JSON).build();
	}
}
