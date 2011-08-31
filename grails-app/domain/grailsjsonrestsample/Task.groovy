package grailsjsonrestsample

class Task {
	static expose = true
	static belongsTo = Person
	static hasMany = [assignedTo:Person]
	
	String name
	Date start
	
    static constraints = {
    }
}
