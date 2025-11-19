import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Device {
  id: number;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';  
}

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  devices?: Device[];
}

@Component({
  selector: 'app-device-tree',
  imports: [CommonModule, FormsModule],
  templateUrl: './device-tree.component.html',
  styleUrls: ['./device-tree.component.css']
})
export class DeviceTreeComponent implements OnInit {
  treeNodes: TreeNode[] = [
    {
      id: 'root-1',
      name: 'رئیس کل',
      children: [
        {
          id: 'node-1-1',
          name: 'معاون فناوری های نوین',
          children: [
            {
              id: 'node-1-1-1',
              name: 'مدیر هوش مصنوعی و امنیت اطلاعات',
              devices: [
                { id: 1, name: 'دستگاه 1', type: 'entertainment', status: 'online' },
                { id: 2, name: 'دستگاه 2', type: 'lighting', status: 'online' }
              ]
            },
            {
              id: 'node-1-1-2',
              name: 'مدیر اداره زیرساخت و پشتیبانی فناوری اطلاعات',
              devices: [
                { id: 3, name: 'دستگاه 3', type: 'climate', status: 'warning' }
              ]
            },
            {
              id: 'node-1-1-3',
              name: 'مدیر اداره مهندسی نرم افزار',
              children: [
                {
                  id: 'node-1-1-3-1',
                  name: 'تیم توسعه',
                  devices: [
                    { id: 4, name: 'دستگاه 4', type: 'appliance', status: 'online' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'node-1-2',
          name: 'رئیس مرکز حراست',
          children: [
            {
              id: 'node-1-2-1',
              name: 'مدیرکل حفاظت پرسنلی',
              devices: [
                { id: 5, name: 'دستگاه 5', type: 'appliance', status: 'online' },
                { id: 6, name: 'دستگاه 6', type: 'appliance', status: 'online' }
              ]
            },
            {
              id: 'node-1-2-2',
              name: 'مدیرکل حفاظت فناوری اطلاعات',
              devices: [
                { id: 7, name: 'دستگاه 7', type: 'appliance', status: 'online' }
              ]
            }
          ]
        }
      ]
    }
  ];

  searchQuery: string = '';
  expandedNodes: Set<string> = new Set();
  activeDeviceId: number | null = null;
  notificationMessage: string = '';

  ngOnInit(): void {
    // Component initialization if needed
  }

  hasChildren(node: TreeNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  hasDevices(node: TreeNode): boolean {
    return !!(node.devices && node.devices.length > 0);
  }

  shouldShowAsNode(node: TreeNode): boolean {
    return this.hasChildren(node);
  }

  getChildCount(node: TreeNode): number {
    let count = 0;
    if (node.children) {
      node.children.forEach(child => {
        if (this.shouldShowAsNode(child)) {
          // Count this node and recursively count its children
          count += 1;
          count += this.getChildCount(child);
        } else if (child.devices) {
          // Count devices from nodes that don't have children
          count += child.devices.length;
        }
      });
    }
    if (node.devices) {
      count += node.devices.length;
    }
    return count;
  }

  toggleNode(nodeId: string): void {
    if (this.expandedNodes.has(nodeId)) {
      this.expandedNodes.delete(nodeId);
    } else {
      this.expandedNodes.add(nodeId);
    }
  }

  isNodeExpanded(nodeId: string): boolean {
    return this.expandedNodes.has(nodeId);
  }

  onDeviceClick(device: Device): void {
    this.activeDeviceId = device.id;
  }

  isDeviceActive(deviceId: number): boolean {
    return this.activeDeviceId === deviceId;
  }

  getFilteredNodes(nodes: TreeNode[]): TreeNode[] {
    if (!this.searchQuery) {
      return nodes;
    }
    
    const query = this.searchQuery.toLowerCase();
    return nodes.filter(node => {
      const matchesName = node.name.toLowerCase().includes(query);
      const hasMatchingChildren = node.children && this.getFilteredNodes(node.children).length > 0;
      const hasMatchingDevices = node.devices && node.devices.some(d => 
        d.name.toLowerCase().includes(query)
      );
      
      return matchesName || hasMatchingChildren || hasMatchingDevices;
    }).map(node => {
      if (!node.children) {
        return node;
      }
      return {
        ...node,
        children: this.getFilteredNodes(node.children)
      };
    });
  }
}

