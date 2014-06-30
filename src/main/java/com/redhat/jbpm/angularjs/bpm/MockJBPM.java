package com.redhat.jbpm.angularjs.bpm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;


@Named
@ApplicationScoped
public class MockJBPM {

	private Map<Long, TaskSummary> availableTasks = new ConcurrentHashMap<Long, TaskSummary>();
	private Map<Long, TaskSummary> assignedTasks = new ConcurrentHashMap<Long, TaskSummary>();

	public MockJBPM() {

		for (long i = 0; i < 3; i++) {

			TaskSummary ts = new TaskSummary();
			ts.setActivationTime(new Date());
			ts.setCreatedOn(new Date());
			ts.setDescription("task description 1");
			ts.setId(i);
			ts.setName("humanTask1");
			ts.setPotentialOwners(Arrays.asList(new String[] { "abaxter" }));
			ts.setProcessId("loan_process");
			ts.setProcessInstanceId(i);
			ts.setSkipable(false);
			ts.setStatus(Status.Ready);
			ts.setSubject("hello " + i);
			availableTasks.put(i, ts);
		}

		for (long i = 3; i < 8; i++) {

			TaskSummary ts = new TaskSummary();
			ts.setActivationTime(new Date());
			ts.setCreatedOn(new Date());
			ts.setDescription("task description 1");
			ts.setId(i);
			ts.setName("humanTask2");
			ts.setPotentialOwners(Arrays.asList(new String[] { "abaxter" }));
			ts.setProcessId("loan_process");
			ts.setProcessInstanceId(i);
			ts.setSkipable(false);
			ts.setStatus(Status.Ready);
			ts.setSubject("hello " + i);
			availableTasks.put(i, ts);
		}

	}

	public synchronized List<TaskSummary> getAvailableTasks() {

		List<TaskSummary> tasks = new ArrayList<TaskSummary>(availableTasks.entrySet().size());

		for (Long key : availableTasks.keySet()) {

			tasks.add(availableTasks.get(key));

		}

		return tasks;
	}

	public synchronized List<TaskSummary> getAssignedTasks() {
		List<TaskSummary> tasks = new ArrayList<TaskSummary>(assignedTasks.entrySet().size());

		for (Long key : assignedTasks.keySet()) {

			tasks.add(assignedTasks.get(key));

		}
		return tasks;

	}

	public synchronized void claim(String user, Long id) {

		TaskSummary ts = availableTasks.get(id);
		ts.setStatus(Status.Reserved);

		availableTasks.remove(id);
		assignedTasks.put(id, ts);

	}

	public synchronized void start(String user, Long id) {

		TaskSummary ts = assignedTasks.get(id);

		ts.setStatus(Status.InProgress);
	}

	public synchronized void complete(String user, Long id) {

		TaskSummary ts = assignedTasks.get(id);

		ts.setStatus(Status.Completed);
	}

	public synchronized void release(String user, Long id) {

		TaskSummary ts = assignedTasks.get(id);

		ts.setStatus(Status.Ready);

		availableTasks.put(id, ts);
		assignedTasks.remove(id);

	}

}
