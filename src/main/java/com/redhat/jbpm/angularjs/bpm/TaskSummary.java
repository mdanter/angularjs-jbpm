package com.redhat.jbpm.angularjs.bpm;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * TaskSummary implementation that supports JAXB.
 * 
 * @author bradsdavis, mdanter
 *
 */
@XmlRootElement(name="task-summary")
@XmlAccessorType(XmlAccessType.FIELD)
public class TaskSummary implements Serializable 
{
    @XmlElement
    private long id;
    
    @XmlElement
    private String name;
    
    @XmlElement
    private String subject;
    
    @XmlElement
    private String description;
    
    @XmlElement
    private Status status;
    
    @XmlElement
    private int priority;
    
    @XmlElement
    private boolean skipable;
    
    @XmlElement(name="actual-owner")
    private String actualOwner;
    
    @XmlElement(name="created-by")
    private String createdBy;
    
    @XmlElement(name="created-on")
    private Date createdOn;
    
    @XmlElement(name="activation-time")
    private Date activationTime;
    
    @XmlElement(name="expiration-time")
    private Date expirationTime;
    
    @XmlElement(name="process-instance-id")
    private long processInstanceId;
    
    @XmlElement(name="process-id")
    private String processId;
    
    @XmlElement(name="process-session-id")
    private int processSessionId;

    @XmlElement(name="potential-owner")
    private List<String> potentialOwners;

    public TaskSummary() {
    	//default
    }
    
    
	public void setId(long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public void setSkipable(boolean skipable) {
		this.skipable = skipable;
	}

	public void setActualOwner(String actualOwner) {
		this.actualOwner = actualOwner;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public void setActivationTime(Date activationTime) {
		this.activationTime = activationTime;
	}

	public void setExpirationTime(Date expirationTime) {
		this.expirationTime = expirationTime;
	}

	public void setProcessInstanceId(long processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public void setProcessId(String processId) {
		this.processId = processId;
	}

	public void setProcessSessionId(int processSessionId) {
		this.processSessionId = processSessionId;
	}

	public void setPotentialOwners(List<String> potentialOwners) {
		this.potentialOwners = potentialOwners;
	}

	public long getId() {
		return this.id;
	}

	public long getProcessInstanceId() {
		return this.processInstanceId;
	}

	public String getName() {
		return this.name;
	}

	public String getSubject() {
		return this.subject;
	}

	public String getDescription() {
		return this.description;
	}

	public Status getStatus() {
		return this.status;
	}

	public int getPriority() {
		return this.priority;
	}

	public boolean isSkipable() {
		return this.skipable;
	}

	public String getActualOwner() {
		return this.actualOwner;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public Date getCreatedOn() {
		return this.createdOn;
	}

	public Date getActivationTime() {
		return this.activationTime;
	}

	public Date getExpirationTime() {
		return this.expirationTime;
	}

	public String getProcessId() {
		return this.processId;
	}

	public int getProcessSessionId() {
		return this.processSessionId;
	}

	public List<String> getPotentialOwners() {
		return this.potentialOwners;
	}

	

	@Override
	public String toString() {
		return "TaskSummary [id=" + id + ", name=" + name + ", subject="
				+ subject + ", description=" + description + ", status="
				+ status + ", priority=" + priority + ", skipable=" + skipable
				+ ", actualOwner=" + actualOwner + ", createdBy=" + createdBy
				+ ", createdOn=" + createdOn + ", activationTime="
				+ activationTime + ", expirationTime=" + expirationTime
				+ ", processInstanceId=" + processInstanceId + ", processId="
				+ processId + ", processSessionId=" + processSessionId
				+ ", potentialOwners=" + potentialOwners + "]";
	}

}
