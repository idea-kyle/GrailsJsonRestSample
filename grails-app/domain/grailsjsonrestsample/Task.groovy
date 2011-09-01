package grailsjsonrestsample

class Task {
	static expose = "tasks"
	static belongsTo = Person
	static hasMany = [assignedTo:Person]
	
	String name
	Date dueOn
	
    static constraints = {
    }
}
