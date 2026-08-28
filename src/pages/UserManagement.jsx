import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  MoreVertical,
  Shield,
  Ban,
  CheckCircle,
  Trash2,
  Edit3,
  Mail,
  Calendar,
  Database,
  Eye,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { mockUsers } from '../data/mockData';

export const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Analyst',
    status: 'Active',
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    const matchesStatus = statusFilter ? u.status === statusFilter : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: formData.role,
      status: formData.status,
      lastActivity: 'Just now',
      datasetsCount: 0,
    };
    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', role: 'Analyst', status: 'Active' });
  };

  const handleToggleBlock = (userId) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={val} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
          <div>
            <p className="font-bold text-navy-900 text-xs">{val}</p>
            <p className="text-[11px] text-text-secondary">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (role) => (
        <Badge variant={role === 'Admin' ? 'ai' : 'info'}>
          <Shield className="w-3 h-3" />
          {role}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (status) => (
        <Badge variant={status === 'Active' ? 'active' : status === 'Blocked' ? 'blocked' : 'pending'} dot>
          {status}
        </Badge>
      ),
    },
    {
      key: 'lastActivity',
      header: 'Last Activity',
      sortable: true,
      render: (val) => <span className="text-xs text-text-secondary">{val}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setSelectedUser(row);
              setIsDetailDrawerOpen(true);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleToggleBlock(row.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title={row.status === 'Blocked' ? 'Unblock User' : 'Block User'}
          >
            {row.status === 'Blocked' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Ban className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleDeleteUser(row.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">User Management & Permissions</h2>
          <p className="text-xs text-text-secondary mt-0.5">Manage team access, role assignments, and security statuses</p>
        </div>
        <Button variant="primary" icon={UserPlus} onClick={() => setIsAddModalOpen(true)}>
          Add New User
        </Button>
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            placeholder="Search by user name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
          <Select
            options={[
              { label: 'All Roles', value: '' },
              { label: 'Admin', value: 'Admin' },
              { label: 'Data Scientist', value: 'Data Scientist' },
              { label: 'Analyst', value: 'Analyst' },
              { label: 'Viewer', value: 'Viewer' },
            ]}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            placeholder="Filter by Role"
          />
          <Select
            options={[
              { label: 'All Statuses', value: '' },
              { label: 'Active', value: 'Active' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Blocked', value: 'Blocked' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by Status"
          />
        </div>
      </Card>

      {/* User Data Table */}
      <Table
        columns={columns}
        data={filteredUsers}
        pageSize={5}
        onRowClick={(user) => {
          setSelectedUser(user);
          setIsDetailDrawerOpen(true);
        }}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Workspace User"
        subtitle="Provision access for a team member"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Sarah Jenkins"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Work Email Address"
            type="email"
            placeholder="sarah@analytics.ai"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Select
            label="Role Assignment"
            options={['Admin', 'Data Scientist', 'Analyst', 'Viewer']}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Select
            label="Initial Status"
            options={['Active', 'Pending']}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Provision User
            </Button>
          </div>
        </form>
      </Modal>

      {/* User Detail Slide-over Drawer */}
      {selectedUser && (
        <Drawer
          isOpen={isDetailDrawerOpen}
          onClose={() => setIsDetailDrawerOpen(false)}
          title="User Account Details"
          subtitle={`ID: ${selectedUser.id}`}
        >
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue"
              />
              <div>
                <h4 className="text-base font-bold text-navy-900">{selectedUser.name}</h4>
                <p className="text-xs text-text-secondary">{selectedUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={selectedUser.role === 'Admin' ? 'ai' : 'info'}>{selectedUser.role}</Badge>
                  <Badge variant={selectedUser.status === 'Active' ? 'active' : 'blocked'} dot>{selectedUser.status}</Badge>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-xs">
                <span className="text-xs text-text-secondary">Uploaded Datasets</span>
                <p className="text-xl font-extrabold text-navy-900 mt-1">{selectedUser.datasetsCount}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-xs">
                <span className="text-xs text-text-secondary">Last Active</span>
                <p className="text-sm font-bold text-navy-900 mt-1">{selectedUser.lastActivity}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <Button
                variant={selectedUser.status === 'Blocked' ? 'primary' : 'outline'}
                className="w-full justify-center"
                onClick={() => handleToggleBlock(selectedUser.id)}
              >
                {selectedUser.status === 'Blocked' ? 'Unblock Account' : 'Suspend / Block Account'}
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default UserManagement;
